import styled from "styled-components";
import Responsive from "../../config/Responsive";

export const Breadcrumbs = styled.div`
    color: var(--text-color);
    font-size: 16px;
    font-family: 'helvetica';
    font-weight: 400;
    margin-bottom: 30px;
    opacity: 0.8;
    ${Responsive.laptop}{
        font-size: 12px;
      }
`;