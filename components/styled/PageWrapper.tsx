import styled from "styled-components";

export const PageWrapper = styled.div`
    border-radius: 2.0rem;
    margin-top: 14.7rem;
    /* top: 14.5rem; */
    /* position: fixed; */
    background-color: white;
    /* height: 100%; */
    /* overflow: hidden; */
    overflow-y: auto;
    width: 100%;
    z-index: 1;
    padding: 4.0rem;
    @media(max-width: 600px) {
        & {
            padding: 4.0rem 2.4rem;
        }
    }
`;