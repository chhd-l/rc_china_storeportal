import { ctpClient } from './BuildClient';
import { Consumer, CustomerPagedQueryResponse } from './types/customer'
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient);

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools API without any endpoints.
const getProject = () => {
  return apiRoot.withProjectKey({ projectKey: '{projectKey}' }).get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);


apiRoot.withProjectKey({projectKey: ''}).customers().emailConfirm
// export {}