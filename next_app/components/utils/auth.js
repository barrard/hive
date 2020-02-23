import Router from "next/router";

export function ensure_loggedin(ctx) {
  let state = ctx.store.getState();
  if (!state.user.is_loggedin) {
    if (ctx.req) {
      ctx.res.redirect("/login");
    } else {
      Router.push("/login");
    }
  } else {
    return true;
  }
}


export function ensure_not_loggedin(ctx) {
  let state = ctx.store.getState();
  if (state.user.is_loggedin) {
    if (ctx.req) {
      ctx.res.redirect("/account-overview");
    } else {
      Router.push("/account-overview");
    }
  } else {
    return true;
  }
}
