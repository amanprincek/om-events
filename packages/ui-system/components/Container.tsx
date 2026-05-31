import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: 'default' | 'narrow';
  className?: string;
}

export function Container({ 
  children, 
  width = 'default',
  className = '', 
  ...props 
}: ContainerProps) {
  
  const widthStyles = width === 'default' ? 'max-w-[1440px]' : 'max-w-4xl';

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${widthStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
