import {LoginRO} from "../../../models/server";
import {GenericRequestState, useGenericRequest} from "@crud-studio/react-crud-core";

function useLoginEmailPassword(
  email: string,
  password: string,
): GenericRequestState<LoginRO> {
  return useGenericRequest<LoginRO>(
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
