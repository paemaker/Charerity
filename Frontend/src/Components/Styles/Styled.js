import styled from 'styled-components';

export const RowContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
    padding: 25px 150px;
    background-color: #f8f5f1;
    position: relative;
`;
export const ColContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 25px 150px;
    background-color: #f8f5f1;
    position: relative;
`;
export const Card = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column wrap;
    width: ${props => props.width ? "1000px" : "200px"};
    max-width: ${props => props.width ? "1000px" : "250px"};
    justify-content: ${props => props.center ? "center" : "null"};
    align-items: ${props => props.center ? "center" : "null"};;
    border: solid 1px #f8f5f1;
    background-color: #f8f5f1;
    padding: 10px;
    margin: 10px;
    transition: 0.5s;
    :hover {
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
        ;
        background-color: #f8ede3;
        border: solid 1px #28b5b5;
    }
`;
export const DetailCard = styled.div`
    width: 100%;
    max-width: 900px;
    display: grid;
    grid: ${props => props.giver ? "auto / 1fr 1fr" : "auto / 400px 500px"};
    border: 1px solid #28b5b5;
    transition: 0.5s;

    :hover {
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
        ;
        background-color: #f8ede3;
    }
    
    @media (max-width: 770px) {
        flex-wrap: wrap;
    }
`;
export const Img = styled.img`
    width: 60%;
    margin: 50px;
    border: solid 1px #28b5b5;
`;
export const ImageSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
`;
export const ContentSection = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
    margin: 50px;
`;
export const Button = styled.button`
    background-color: #28b5b5;
    color: #ffffff;
    border: 2px solid #28b5b5;
    font-size: 15px;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    transition: 0.5s;

    :hover {
        background-color: #8fd9a8;
        color: #ffffff;
        border: 2px solid #8fd9a8;
    }
`;
export const Title = styled.h2`
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    color: #4b778d;
`;
export const Breadcrumb = styled.div`
    display: flex;
    flex-flow: rows wrap;
    justify-content: flex-start;
    padding: 10px;
    background-color: #8fd9a8;
    color: #ffffff;
    border: 1px solid #8fd9a8;
    margin: 0 0 10px;
`;
export const BreadUl = styled.ul`
    letter-spacing: 1px;
    color: #4b778d;
    margin: 0;
    padding: 0;
    display: inline-flex;
    list-style: none;
    margin-right: 5px;
`;
export const BreadLi = styled.li`
    margin-right: 5px;
`;
export const PageTitle = styled.h1`
    text-transform: uppercase;
    margin: 30px 0 50px;
    color: #4b778d;
`;
export const Input = styled.input`
    font-size: 15px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px 0;
    border: solid 2px #28b5b5;
    border-radius: 3px;
    width: 100%;
    color: #4b778d;
    background-color: #f8f5f1;
    transition: 0.5s;
    
    :focus {
        border: solid 2px #d2e69c;
    }
`;
export const Label = styled.label`
    margin: 0;
    color: #4b778d;
    font-weight: 900;
`;
export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;
export const TD = styled.td`
    text-align: left;
    padding: 10px;
`;
export const TR = styled.tr`
`;
export const Info = styled.h4`
    color: #4b778d;
    padding: 0;
    margin: 0;
`;
export const TableGreen = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 30px;
`;
export const TRGreen = styled.tr`
    border: 1px solid #28b5b5;
    color: #4b778d;

    :nth-child(even) {
        background-color: #f8f5f1;
    }

    :hover {
        background-color: #d8f8b7;
    }
`;
export const TDGreen = styled.td`
    border: 1px solid #28b5b5;
    color: #4b778d;
    text-align: left;
    padding: 8px;
    text-align: center;
`;
export const THGreen = styled.th`
    background-color: #28b5b5;
    border: 1px solid #28b5b5;
    color: #f8f5f1;
    text-align: left;
    padding: 8px;
    text-align: center;
`;
export const Wrapper = styled.div`
    background-color: #f8f5f1;
    padding: 10px 30px 30px;
`;