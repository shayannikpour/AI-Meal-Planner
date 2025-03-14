import { useEffect, useState } from "react";
import { fetchTags } from "../api";

const TagList = ({ onSelectTags }: { onSelectTags: (selectedTags: string[]) => void }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
            ? selectedTags.filter(t => t !== tag) // Remove if already selected
            : [...selectedTags, tag]; // Add if not selected

        setSelectedTags(updatedTags);
        onSelectTags(updatedTags); // Send selected tags to parent
    };

    return (
        <div>
            <h2>Select Tags</h2>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} onClick={() => toggleTag(tag)}
                        style={{
                            cursor: "pointer",
                            fontWeight: selectedTags.includes(tag) ? "bold" : "normal"
                        }}>
                        {tag} {selectedTags.includes(tag) ? "✅" : ""}
                    </li>
                ))}
            </ul>
            <h3>Selected Tags:</h3>
            <p>{selectedTags.length > 0 ? selectedTags.join(", ") : "None selected"}</p>
        </div>
    );
};

export default TagList;
