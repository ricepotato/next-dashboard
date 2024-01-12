import * as AWS from "@aws-sdk/client-ssm";

const region = "ap-northeast-2";
const apiVersion = "2014-11-06";

/**
 * AWS Systems Manager Parameter Store 로부터 특정 파라미터를 가져옵니다.
 *
 * @param {string} name - 이 값은 '/' 로 시작해야합니다. 대소문자를 구분합니다. 특정한 값이 있는 name 을 가리켜야 합니다. 예를들어 "/event/stolantern2023/contract_address".
 *
 * @param { "development" | "production" | "staging" | "common" | "preview" | undefined } env - 파라미터를 가져올 환경을 지정합니다. 지정하지 않으면 process.env.NEXT_APP_ENVIRONMENT 의 값으로 가져옵니다. 'common' 은 모든 환경에서 공통으로 사용하는 파라미터를 가져옵니다.
 *
 * @returns {Promise<string | undefined>} 결과값이 없는 경우 undefined 를 반환합니다.
 */
export async function getParam(name: string) {
  /*
Available Paramsters name

- /event/stolantern2023/contract_address

*/
  const ssmClient = new AWS.SSM({
    apiVersion,
    region,
  });
  console.debug(`[params] getParam. name=${name}`);
  try {
    const param = await ssmClient.getParameter({
      Name: name,
    });
    return param.Parameter;
  } catch (e) {
    console.warn(`[params] GetParamter Error. ${e} name=${name}`);
    return undefined;
  }
}

/**
 * AWS Systems Manager Parameter Store 로부터 특정 path 의 모든 파라미터를 가져옵니다.
 *
 * @param {string} path -  이 값은 '/' 로 시작해야합니다. 대소문자를 구분합니다. 예를들어 "/event".
 *
 * @param { "development" | "production" | "staging" | "common" | ""preview" | undefined } env - 파라미터를 가져올 환경을 지정합니다. 지정하지 않으면 process.env.NEXT_APP_ENVIRONMENT 의 값으로 가져옵니다. 'common' 은 모든 환경에서 공통으로 사용하는 파라미터를 가져옵니다.
 *
 * @returns {Promise<Array<AWS.SSM.Parameter>>} 결과값이 없는 경우 'Parameters' 가 빈 리스트인 결과를 반환합니다.
 */
export async function getParamsByPath(path: string) {
  const ssmClient = new AWS.SSM({
    apiVersion,
    region,
  });

  console.debug(`[params] getParamsByPath. path=${path}`);
  try {
    const params = await ssmClient.getParametersByPath({
      Path: path,
      Recursive: true,
    });
    return params.Parameters;
  } catch (e) {
    console.warn(`[params] getParamsByPath Error. ${e} path=${path}`);
    return undefined;
  }
}
