'use client';
import Button from '@/components/ui/button';
import LinkButton from '@/components/ui/link-button';
import React from 'react';

const handleClick = () => console.log('ㅇㅇㅇㅇ');
const page = () => {
  return (
    <div>
      <div className='border p-4'>
        <Button onClick={handleClick}>기본 버튼</Button>
        <Button onClick={handleClick} size='large'>
          large
        </Button>
        <Button onClick={handleClick} size='fixed'>
          fixed
        </Button>
        <Button onClick={handleClick} size='small'>
          small
        </Button>
        <Button onClick={handleClick} square>
          square
        </Button>
        <Button onClick={handleClick} disabled>
          disabled
        </Button>
      </div>
      <div>
        <LinkButton href='#'>link</LinkButton>
        <LinkButton href='#' size='small'>
          link
        </LinkButton>
        <LinkButton href='#' size='large'>
          link
        </LinkButton>
        <LinkButton href='#' size='fixed'>
          link
        </LinkButton>
        <LinkButton href='#' square>
          link
        </LinkButton>
        <LinkButton href='#' target='_blank'>
          link
        </LinkButton>
      </div>
    </div>
  );
};

export default page;
