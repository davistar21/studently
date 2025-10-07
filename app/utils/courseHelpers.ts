import { client } from "~/lib/amplifyClient";
import type { Course, Topic } from "types";
// Define the shape of the data needed to CREATE a new topic record
type TopicCreateInput = { 
    title: string; 
    status: "not_started" | "in_progress" | "not_completed" | "completed"|null;
    progress?: number | null; 
};
const permission : any = { authMode: "userPool" }

export const CourseAPI = {
  create: async (input: {
    id?: string;
    name: string;
    code: string;
    units: number;
    progress?: number;
    grade?: string; 
    semesterId: string; // link to Semester
  }) => client.models.Course.create(input),

  get: async (id: string) =>
    client.models.Course.get(
        { id },
        { 
            selectionSet: [
                'id', 'name', 'units', 'code', 'progress', 'grade', 
                'semesterId', // Important for linking
                'topics.*' // Eagerly loads all scalar fields for Topics
            ]
        }
    ),

  list: async () =>
    client.models.Course.list(),

  update: async (updatedCourse: Course) => {
        const updatedId = updatedCourse.id;

        // 1. Fetch the original Course from the database (including Topics)
        // Ensure selectionSet fetches all necessary fields for comparison
        const originalResponse = await client.models.Course.get(
            { id: updatedId },
            { 
                selectionSet: [
                    'id', 'name', 'units', 'code', 'progress', 'grade', 
                    'semesterId', // Important for linking
                    'topics.*' // Eagerly loads all scalar fields for Topics
                ]
            }
        );
        const originalCourse = originalResponse.data;
        console.log("Original Course fetched:", originalCourse);

        if (!originalCourse) {
            throw new Error(`Course with ID ${updatedId} not found.`);
        }

        // --- PART 1: COURSE SCALAR FIELD UPDATES ---

        const courseUpdates: Partial<Omit<Course, 'id' | 'topics'>> = {};
        let hasCourseScalarChanges = false;

        // Check all Course scalar fields
        if (originalCourse.name !== updatedCourse.name) {
            courseUpdates.name = updatedCourse.name;
            hasCourseScalarChanges = true;
        }
        if (originalCourse.units !== updatedCourse.units) {
            courseUpdates.units = updatedCourse.units;
            hasCourseScalarChanges = true;
        }
        if (originalCourse.code !== updatedCourse.code) {
            courseUpdates.code = updatedCourse.code;
            hasCourseScalarChanges = true;
        }
        if (originalCourse.progress !== updatedCourse.progress) {
            courseUpdates.progress = updatedCourse.progress;
            hasCourseScalarChanges = true;
        }
        if (originalCourse.grade !== updatedCourse.grade) {
            courseUpdates.grade = updatedCourse.grade;
            hasCourseScalarChanges = true;
        }
        // Note: Moving a course (semesterId change) should ideally be handled 
        // by the Semester update, but we include the check here for completeness:
        // if (originalCourse.semesterId !== updatedCourse.semesterId) { /* ... */ }

        // --- PART 2: TOPIC RELATIONSHIP CHANGES (ADD/DELETE/UPDATE) ---

        const originalTopics = originalCourse.topics || [];
        const topicsModels = await updatedCourse.topics();
        const updatedTopics:Topic[] = topicsModels.items || [];
        const originalIdSet = new Set(originalTopics.map(t => t.id));

        // Identify Deletions: Topics in original, but not in updated list
        const topicsToDelete = originalTopics.filter(topic => 
            !updatedTopics.some(t => t.id === topic.id)
        );

        // Identify Additions: Topics in updated list whose IDs are NEW (not in originalIdSet)
        const topicsToAdd: TopicCreateInput[] = updatedTopics.filter(topic => 
            topic.id && !originalIdSet.has(topic.id)
        ).map(t => ({
            // Map all required fields for Topic creation
            title: t.title,
            status: t.status,
            progress: t.progress,
        }));
        
        // --- PART 3: EXECUTE MUTATIONS ---

        // A. COURSE SCALAR UPDATE
        if (hasCourseScalarChanges) {
            console.log(`Executing scalar update for Course ${updatedId}`);
            await client.models.Course.update({ id: updatedId, ...courseUpdates }, permission);
        }

        // B. TOPIC DELETIONS
        if (topicsToDelete.length > 0) {
            console.log(`Executing ${topicsToDelete.length} topic deletions.`);
            await Promise.all(topicsToDelete.map(topic => 
                client.models.Topic.delete({ id: topic.id }, permission)
            ));
        }

        // C. TOPIC ADDITIONS
        if (topicsToAdd.length > 0) {
            console.log(`Executing ${topicsToAdd.length} topic additions.`);
            await Promise.all(topicsToAdd.map(topicInput => 
                client.models.Topic.create({
                    ...topicInput,
                    courseId: updatedId, // Link the new topic to this course
                }, permission)
            ));
        }

        // D. EXISTING TOPIC SCALAR UPDATES
        const topicsToUpdate = updatedTopics.filter(topic => topic.id && originalIdSet.has(topic.id));

        if (topicsToUpdate.length > 0) {
            console.log(`Checking ${topicsToUpdate.length} existing topics for updates.`);
            
            const updatePromises = topicsToUpdate.map(updatedTopic => {
                const originalTopic = originalTopics.find(t => t.id === updatedTopic.id);
                if (!originalTopic) return Promise.resolve(); // Should be filtered out

                let topicNeedsUpdate = false;
                const topicUpdates: any = { id: updatedTopic.id }; 

                // Check all updatable scalar fields on the Topic model
                if (originalTopic.title !== updatedTopic.title) {
                    topicUpdates.title = updatedTopic.title;
                    topicNeedsUpdate = true;
                }
                if (originalTopic.status !== updatedTopic.status) {
                    topicUpdates.status = updatedTopic.status;
                    topicNeedsUpdate = true;
                }
                if (originalTopic.progress !== updatedTopic.progress) {
                    topicUpdates.progress = updatedTopic.progress;
                    topicNeedsUpdate = true;
                }
                
                if (topicNeedsUpdate) {
                    return client.models.Topic.update(topicUpdates, permission);
                }
                return Promise.resolve();
            });

            await Promise.all(updatePromises);
        }

        // 4. Final Fetch: Return the final, fully updated state from the DB
        console.log(`All operations complete. Fetching final state for Course ${updatedId}`);
        return client.models.Course.get(
            { id: updatedId },
            // Re-fetch using the same selectionSet as the initial get
            { 
                selectionSet: [
                    'id', 'name', 'units', 'code', 'progress', 'grade', 
                    'semesterId', 
                    'topics.*'
                ] 
            }
        );
    },

  delete: async (id: string) =>
    client.models.Course.delete({ id }),
};
