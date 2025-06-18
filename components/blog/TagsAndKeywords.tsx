import { Badge } from "../ui/badge";

const TagsAndKeywords = ({
  tags = [],
  keywords = [],
}: {
  tags: string[];
  keywords: string[];
}) => {
  const strings = [...tags, ...keywords];

  return (
    <div className="flex gap-2">
      {strings.map((keyword, index) => (
        <Badge variant="secondary" key={index} className="keyword">
          #{keyword}
        </Badge>
      ))}
    </div>
  );
};
export default TagsAndKeywords;
