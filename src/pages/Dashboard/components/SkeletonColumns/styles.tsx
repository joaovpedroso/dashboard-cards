import styled, { keyframes } from "styled-components";

export const WrapperSkeleton = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
`;

export const SkeletonElement = styled.span`
    background-color: rgba(0, 0, 0, 0.12);
    display: block;
    height: 200px;
    width: 100%;
    margin-top: 24px;
    border-radius: 32px;
   
    animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
    
    &:empty::before {
        content: '\\00a0';
    }

`;
