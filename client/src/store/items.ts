import { atom } from "jotai";
import { Item } from "@/types/item";

// Mock data for demonstration
const mockItems: Item[] = [
  {
    id: "1",
    title: "React",
    description: "A JavaScript library for building user interfaces",
    starCount: 220000,
    labels: ["javascript", "react", "ui", "facebook"],
  },
  {
    id: "2",
    title: "Next.js",
    description: "The React Framework for Production",
    starCount: 120000,
    labels: ["react", "nextjs", "framework", "vercel"],
  },
  {
    id: "3",
    title: "Material-UI",
    description: "React components for faster and easier web development",
    starCount: 92000,
    labels: ["react", "material-ui", "components", "design"],
  },
  {
    id: "4",
    title: "TypeScript",
    description:
      "TypeScript is a superset of JavaScript that compiles to plain JavaScript",
    starCount: 98000,
    labels: ["typescript", "javascript", "microsoft", "types"],
  },
];

export const itemsAtom = atom<Item[]>(mockItems);
export const searchAtom = atom("");
export const sortByAtom = atom<"title" | "stars" | "recent">("stars");
export const selectedLabelsAtom = atom<string[]>([]);

export const filteredItemsAtom = atom((get) => {
  const items = get(itemsAtom);
  const search = get(searchAtom);
  const sortBy = get(sortByAtom);
  const selectedLabels = get(selectedLabelsAtom);

  const filtered = items.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesLabels =
      selectedLabels.length === 0 ||
      selectedLabels.some((label) => item.labels.includes(label));

    return matchesSearch && matchesLabels;
  });

  // Sort items
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "stars":
        return b.starCount - a.starCount;
      case "recent":
        return a.id.localeCompare(b.id); // Mock recent sort
      default:
        return 0;
    }
  });

  return filtered;
});

export const allLabelsAtom = atom((get) => {
  const items = get(itemsAtom);
  const allLabels = new Set<string>();
  items.forEach((item) => {
    item.labels.forEach((label) => allLabels.add(label));
  });
  return Array.from(allLabels).sort();
});
