import { PostType } from '@/styles/types';
import React, { useEffect, useRef, useState } from 'react'



interface EditableContentProps {
    post: PostType;
    onSave: (content: string) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({ post, onSave }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ content, setContent ] = useState(post.content);
    const contentRef = useRef<HTMLDivElement>(null);
    const latestContentRef = useRef(content);

    useEffect(() => {
        latestContentRef.current = content;
    },[content]);

    const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)){
            setIsEditing(false);
            onSave(latestContentRef.current);
        }
    };
    
    useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }else{
            document.removeEventListener('mousedown', handleClickOutside);
        }return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isEditing]);



    return (
        <div ref={contentRef}>
            {isEditing ? (
                <textarea
                    className="text-gray-700"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    autoFocus
                />       
            ) : (
                <p className='text-gray-700' onClick={() => setIsEditing(true)}>
                    {content}
                </p>
            )}
        </div>
    )
}

export default EditableContent