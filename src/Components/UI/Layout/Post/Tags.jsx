import PropTypes from "prop-types";
import { Badge } from "../../Utils/Badge";

export const Tags = ({ tags }) => {
    return (
        <div
            className={`flex flex-wrap gap-2 ${tags.length > 5 ? 'overflow-x-auto whitespace-nowrap' : ''}`}
        >
            {tags.length > 0 &&
                tags.map((tag) => (
                    <Badge isBig={false} key={tag.id}>
                        # {tag.name}
                    </Badge>
                ))}
        </div>
    );
};

Tags.propTypes = {
    tags: PropTypes.array.isRequired
};
