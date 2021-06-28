import {GenericRequestState, useGenericRequest} from "@crud-studio/react-crud-core";
import {AuthResponseRO} from "../../../models/server";

function useLoginEmailPassword(email: string, password: string): GenericRequestState<AuthResponseRO> {
  return useGenericRequest<AuthResponseRO>(
    {
      url: `/auth/login/EmailPassword`,
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    },
    {
      manual: true,
    }
  );
}
export default useLoginEmailPassword;
