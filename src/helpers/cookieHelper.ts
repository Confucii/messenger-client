export default function getCookie(name: string) {
  const nameEquals = name + "=";
  const cookieArray = document.cookie.split(";");
  let verdict = false;

  cookieArray.forEach((cookie) => {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.slice(1, cookie.length);
    }

    if (cookie.indexOf(nameEquals) === 0) {
      verdict = cookie.slice(nameEquals.length, cookie.length) === "true";
    }
  });
  return verdict;
}
