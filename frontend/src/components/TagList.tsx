import { useEffect, useState } from "react";
import { fetchTags } from "../api";

interface TagListProps {
  onSelectTags: (selectedTags: string[]) => void;
}

const TagList = ({ onSelectTags }: TagListProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data.map((tag: { name: string }) => tag.name));
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    loadTags();
  }, []);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onSelectTags(updatedTags);
  };

  return (
    <div>
      <h2 className="column-heading">Select Tags</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {tags
          .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((tag, index) => (
            <li
              key={index}
              onClick={() => toggleTag(tag)}
              className={selectedTags.includes(tag) ? "selected" : ""}
              style={{ cursor: "pointer", padding: "5px 0" }}
            >
              {tag} {selectedTags.includes(tag) ? "✅" : ""}
            </li>
          ))}
      </ul>

      <h3 style={{ marginTop: "1rem" }}>Selected Tags:</h3>
      <p>{selectedTags.length > 0 ? selectedTags.join(", ") : "None selected"}</p>
    </div>
  );
};

export default TagList;
