import { categoryIconId, type CategoryIconId } from "@/lib/categoryIcons";

export function CategoryGlyph({ id, className = "h-4 w-4" }: { id: string; className?: string }) {
  const name = (categoryIconId(id) || "gear") as CategoryIconId;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {name === "gear" ? (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.2v2.1M12 18.7v2.1M4.9 6.2l1.6 1.4M17.5 16.4l1.6 1.4M3.2 12h2.1M18.7 12h2.1M4.9 17.8l1.6-1.4M17.5 7.6l1.6-1.4" />
        </>
      ) : null}
      {name === "truck" ? (
        <>
          <path d="M3 7.5h10.5V16H3zM13.5 10H18l2.8 3.1V16H13.5" />
          <circle cx="7" cy="16.8" r="1.6" />
          <circle cx="17" cy="16.8" r="1.6" />
        </>
      ) : null}
      {name === "crusher" ? (
        <>
          <path d="M4 4.5h6.2L8.2 19.5H4zM20 4.5h-6.2l2 15h4.2z" />
          <path d="M9.2 12h5.6" />
        </>
      ) : null}
      {name === "screen" ? (
        <>
          <path d="M4 6.5 20 4.8v12.7L4 19.2z" />
          <path d="M9.2 6.1 8.4 18.2M14.8 5.5l-.8 12.1M4.6 10.2h14.6M4.4 14.6h14.8" />
        </>
      ) : null}
      {name === "conveyor" ? (
        <>
          <path d="M4 15.5h16" />
          <path d="M6 15.5 14 7.5h4" />
          <circle cx="6.5" cy="15.5" r="2" />
          <circle cx="17.5" cy="15.5" r="2" />
        </>
      ) : null}
      {name === "wash" ? (
        <>
          <path d="M12 3.5s5 5.2 5 8.6a5 5 0 0 1-10 0c0-3.4 5-8.6 5-8.6z" />
          <path d="M9.2 13.2c.7.8 1.6 1.2 2.8 1.2" />
        </>
      ) : null}
      {name === "parts" ? (
        <>
          <path d="M14.5 6.5a3 3 0 0 0-4.2 3.4L4.5 15.7 8.3 19.5l5.8-5.8a3 3 0 0 0 3.4-4.2L15.2 11.8 12.2 8.8z" />
          <path d="M7.2 16.8l-1.8 1.8" />
        </>
      ) : null}
      {name === "trailer" ? (
        <>
          <path d="M3 15.5h13.5V8.5H8.5L3 12.2zM16.5 12H21v3.5" />
          <circle cx="7" cy="17.2" r="1.6" />
          <circle cx="16" cy="17.2" r="1.6" />
        </>
      ) : null}
      {name === "bucket" ? (
        <>
          <path d="M4 16.5h9.5l2.2-6.2H8.2z" />
          <path d="M13.5 10.3 19 6.2M16.2 8.4l1.6 2.4" />
        </>
      ) : null}
      {name === "layers" ? (
        <>
          <path d="M12 4.5 20 8.5 12 12.5 4 8.5z" />
          <path d="M4 12.2 12 16.2 20 12.2" />
          <path d="M4 15.6 12 19.6 20 15.6" />
        </>
      ) : null}
    </svg>
  );
}
