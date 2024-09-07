/*
This is an example snippet - you should consider tailoring it
to your service.
*/

const url  = "http://localhost:8080/v1/graphql";

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    ); 
    return await result.json();
}
  
const operationsDoc = `
query EventLiquidateQuery($limit: Int!, $offset: Int!) {
    OracleXBet_Liquidate(limit: $limit, offset: $offset) {
    id
    user
    unit
    liquidateType
    group
    db_write_timestamp
    amount
    action
    }
}
`;
 
export function fetchEventLiquidateQuery(limit, offset) {
    return fetchGraphQL(
        operationsDoc,
        "EventLiquidateQuery",
        {"limit": limit, "offset": offset}
    );
}

