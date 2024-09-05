'use client';
import { bookmarkType } from '@/types/bookmarkType';
import Tag from '../ui/tag';
import { useEffect, useRef, useState } from 'react';
import { editBookmark } from '@/db/actions/bookmarkActions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';

function Tags(props: bookmarkType) {
  const router = useRouter();
  const [showRemove, setShowRemove] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useOutsideClick(() => {
    if (showRemove) setShowRemove(false);
  });
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth}px`;
    }
  }, [inputValue]);

  const handleContainerClick = () => {
    setShowRemove(true);
    inputRef.current?.focus();
  };

  function removeTag(tag: string) {
    const newBookmark = { ...props, tags: props.tags.filter((t) => t !== tag) };
    editBookmark(newBookmark)
      .then(() => {
        toast.success('Tag removed');

        router.refresh();
      })
      .catch(() => {
        toast.error('Failed to remove tag');
      });
  }

  function addTag(tag: string) {
    if (!tag) return;
    if (props.tags.includes(tag)) {
      toast.error('Tag already exists');
      return;
    }
    const newBookmark = { ...props, tags: [...props.tags, tag] };
    editBookmark(newBookmark)
      .then(() => {
        toast.success('Tag added');
        router.refresh();
      })
      .catch(() => {
        toast.error('Failed to add tag');
      });
  }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className='flex flex-row items-center content-center flex-wrap'
    >
      {props.tags &&
        props.tags.map((tag, index) => (
          <Tag text={tag} key={index}>
            {showRemove && (
              <span>
                <button
                  className='ml-1'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                >
                  x
                </button>
              </span>
            )}
          </Tag>
        ))}
      <div className='flex items-center m-1 text-sm'>
        <input
          maxLength={30}
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTag(inputValue);
              setInputValue('');
            }
          }}
          className='border-0 bg-transparent rounded  focus:outline-none'
          placeholder='Add tag'
          style={{ width: '1ch' }}
        />
        <span ref={spanRef} className='invisible h-0 whitespace-pre'>
          {inputValue || 'Add tag'}
        </span>
      </div>
    </div>
  );
}

export default Tags;
