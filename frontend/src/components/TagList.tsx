import { useEffect, useState } from "react";
import { fetchTags } from "../api";

const TagList = () => {
    const [tags, setTags] = useState<string[]>([]);

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

    return (
        <div>
            <h2>Available Tags</h2>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </div>
    );
};

export default TagList;
