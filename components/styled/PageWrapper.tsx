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
    padding: 40px;
    margin-top: 125px;
    min-height: calc(100vh - 492px);
    @media(max-width: 600px) {
        
        & {
            min-height: 50vh;
            padding: 40px 20px;
            margin-top: 80px;
        }
    }
`;