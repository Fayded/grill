import './chunks/astro/server_pDgY8W89.mjs';
import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './chunks/astro-designed-error-pages_BzXQ6ng2.mjs';
import { d as defineAction, o as objectType, s as stringType } from './chunks/server_M9g32lm7.mjs';
import { createClient } from '@libsql/client/web';

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function getActionPath(action) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(action.toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    getActionPath({
      toString() {
        return getActionQueryString(path);
      }
    }),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  return deserializeActionResult({
    type: rawResult.ok ? "data" : "error",
    body: await rawResult.text()
  });
}
toActionProxy();

const turso = createClient({
  url: "libsql://the-grill-fayco.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yYzA4R3ZNeEhYMlNCc3l0d2padm95cEdJeDUiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NTAzMDAwMjUsImlhdCI6MTc0OTY5NTIyNSwiaXNzIjoiaHR0cHM6Ly9jbGVyay50dXJzby50ZWNoIiwianRpIjoiNmE5Zjk5OTVlODI3MmI2OGIxNmUiLCJuYmYiOjE3NDk2OTUyMjAsInN1YiI6InVzZXJfMnlPOW4zT25sVE9QV09ZUEpGYjNnZ0lHQk5XIn0.VPp9SEt3fy8WSxmFVKvPxb2rzLmzhkl6VdlVp4BB1lNXBDfvlPrmiWJ21ALaUdCKqaUiMQ-VnvE-GQu67pG4uJJDeFB18LhHhgrdHgLfVdQyT4zJMBC4Ae1RlY33BY_1S5EOyp1g7-gdt5JOgbgTvtJ3Z02fH0y6F4S-WBZgNibrpb9SXmvbZzOtTALT_UKlw0aGm91CIiy-lux8OlpJUnGsG3TkqiRAxCLVx0eGPYesaQeuje-tlbH0fXKfAXV0ABnv92TXLngZfwAOnKWz9lFnmzXlTYuFWbUDRecr9OgvvlwU-ZiGQhWYLe00DfiQicQ64Xt9cY-_c1d282kvZA"
});

const server = {
  newsletter: defineAction({
    accept: "form",
    input: objectType({
      email: stringType().email()
    }),
    handler: async ({ email }) => {
      try {
        await turso.execute({
          sql: "INSERT INTO emails (email) VALUES (?)",
          args: [email]
        });
        return {
          success: true
        };
      } catch (error) {
        throw new Error("Failed to subscribe email.");
      }
    }
  })
};

export { server };
