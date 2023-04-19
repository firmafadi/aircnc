'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected 
}) => {
    const router = useRouter();
    const param = useSearchParams();
    return (
        <div className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer
                ${selected} ? 'border-b-neutral-800' : 'border-transparent'
                ${selected} ? 'text-neutral-800' : 'text-neutral-500'
            `}
        >
            <Icon size={26}/>
            {label}
        </div>
    )
}

export default CategoryBox;