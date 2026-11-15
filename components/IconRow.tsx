import { lineIcons } from "./lineIcons";

export type IconItem = { icon: keyof typeof lineIcons; label: string };

/** Row of line drawings with a short two line label under each. */
export default function IconRow({ items, paddingBottom = 90 }: { items: IconItem[]; paddingBottom?: number }) {
  return (
    <section className="container reveal icon-row" style={{ maxWidth: 1000, paddingBottom }}>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: "28px 16px",
          textAlign: "center",
          fontSize: 13,
          lineHeight: 1.4,
        }}
      >
        {items.map((item) => {
          // Split the label into two balanced lines, e.g. "Made for / Long Stays".
          const words = item.label.split(" ");
          const cut = Math.ceil(words.length / 2);
          return (
            <li key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {lineIcons[item.icon]}
              <span>
                {words.slice(0, cut).join(" ")}
                {words.length > 1 && (
                  <>
                    <br />
                    {words.slice(cut).join(" ")}
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
