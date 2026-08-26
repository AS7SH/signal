import SearchIcon from "@/assets/search-icon";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useApp } from "@/hooks/use-app";
import { useDebounce } from "@/lib/use-debounce";
import { useEffect, useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const setSearchQuery = useApp((state) => state.setSearchQuery);
    const debouncedSearch = useDebounce(searchTerm, 400);

    useEffect(() => {
        setSearchQuery(debouncedSearch);
    }, [setSearchQuery, debouncedSearch]);

    return (
        <InputGroup className="rounded-full flex items-center">
            <InputGroupInput
                type="text"
                className="ml-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
                <SearchIcon className="size-5" />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchBar;
