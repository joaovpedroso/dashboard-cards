import styled from "styled-components";

export const WrapperModal = styled.div`
    width: 100%;
    height: 100vh;
    top: 0;
    bottom: 0;
    overflow: hidden;
    position: absolute;
    background-color: rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    width: 300px;
    padding: 24px;
    background-color: #FFF;
    border-radius: 8px;

    h3 {
        margin: 0;
    }

    p {
        font-size: 16px;
        line-height: 18px;
        font-weight: normal;
    }

`;

export const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
`;