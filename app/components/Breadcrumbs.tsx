import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "~/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { useAppStore } from "~/lib/zustandStore";
import capitalizeWords from "~/utils/capitalizeWords";

export default function Breadcrumbs() {
  const location = useLocation();
  const { getSemesterById } = useAppStore();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { label: string; to?: string }[]
  >([]);

  useEffect(() => {
    const buildBreadcrumbs = async () => {
      const segments = location.pathname.split("/").filter(Boolean);
      const crumbs: { label: string; to?: string }[] = [
        { label: "Dashboard", to: "/dashboard" },
      ];

      if (segments[0] === "semesters") {
        crumbs.push({ label: "Semesters", to: "/semesters" });
        if (segments[1]) {
          const semesterId = segments[1];
          try {
            const semester = getSemesterById(semesterId);
            console.log("Breadcrumb semester:", semester);
            if (semester) {
              crumbs.push({
                label: semester.name,
                to: `/semesters/${semesterId}`,
              });

              if (segments[2] === "courses" && segments[3]) {
                const courseId = segments[3];
                const course = semester.courses?.find(
                  (c: any) => c.id === courseId
                );
                if (course) {
                  crumbs.push({ label: course.name }); // current page, no link
                }
              }
            } else {
              crumbs.push({ label: semesterId }); // fallback label
            }
          } catch (err) {
            console.error("Failed to load breadcrumb names", err);
          }
        }
      } else {
        crumbs.push({ label: capitalizeWords(segments[0]) });
      }

      setBreadcrumbs(crumbs);
    };

    buildBreadcrumbs();
  }, [location.pathname]);

  // If breadcrumbs <= 4, just show them all normally
  // If more, show first, ellipsis dropdown for middle crumbs, and last crumb
  const showEllipsis = breadcrumbs.length > 4;

  // These are crumbs that go inside dropdown (exclude first and last)
  const dropdownCrumbs = showEllipsis ? breadcrumbs.slice(1, -1) : [];

  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar border-b-3 border-gray-500 p-2">
      <Breadcrumb className="min-w-max">
        <BreadcrumbList>
          {/* First crumb */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={breadcrumbs[0]?.to ?? "/"}>
                {breadcrumbs[0]?.label ?? "/"}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Ellipsis with dropdown if needed */}
          {showEllipsis ? (
            <>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer">
                    <BreadcrumbEllipsis className="size-4" />
                    <span className="sr-only">Toggle breadcrumb menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {dropdownCrumbs.map((crumb, idx) => (
                      <DropdownMenuItem key={idx} asChild>
                        <Link to={crumb.to ?? "#"}>{crumb?.label ?? "/"}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            // If no ellipsis, render the intermediate crumbs normally
            breadcrumbs.slice(1, -1).map((crumb, idx) => (
              <Fragment key={idx}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={crumb?.to ?? "/"}>{crumb?.label ?? "/"}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))
          )}

          {/* Last crumb */}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {breadcrumbs[breadcrumbs.length - 1]?.label ?? "/"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
