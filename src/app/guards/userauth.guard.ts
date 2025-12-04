import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userauthGuard: CanActivateFn = () => {
  const router = inject(Router)

  if (sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("user") || "").role == "User") {
    return true
  }
  else {
    alert("unAuthorized access please login ")
    router.navigateByUrl('/login')
    return false
  }
};
