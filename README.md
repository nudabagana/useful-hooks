## useful-hooks
Useful React hooks for website development.
## Available hooks
* [useScrollToTop](#useScrollToTop) - scrolls page to top on load.
* [useWindowVisible](#useWindowVisible) - shows if window is visible.
* [useStateWithLocalStorage](#useStateWithLocalStorage) - stores your state in local storage (it stays on page reaload).
* [useCountdown](#useCountdown) - countdown in seconds.
* [useAuth](#useAuth) - easily store, use, change your authentication token in any part of your webapp.
* [useCloseOnClick](#useCloseOnClick) - close your menu/pop-up when you click anywhere on the site.
## Installation
Using npm:

```bash
$ npm install @nudabagana/useful-hooks
```

Using yarn:

```bash
yarn add @nudabagana/useful-hooks
```

## useScrollToTop
Use this hook to make your page scroll to top on open.

Usage:

```ts
import { useScrollToTop } from "@nudabagana/useful-hooks";

const App: FC = () => {
  useScrollToTop();

  return <>Top of the Page</>;
};
```

## useWindowVisible
Use this hook to check detect your page is currently visible to the user. You can also detect when it changes from visible to invisible and vice versa.

Usage:

```ts
import { useWindowVisible } from "@nudabagana/useful-hooks";

const App: FC = () => {
  const isVisible = useWindowVisible();

  useEffect(() => {
    if (isVisible) {
      console.log("Window became visible!");
    } else {
      console.log("Window became invisible!");
    }
  }, [isVisible]);

  return <>Page is currently {isVisible ? "visible" : "invisible"}</>;
};
```

## useStateWithLocalStorage
Use this hook to store your state in local storage. If user reloads page or browser, state will stay the same.

Usage:
```ts
import { useStateWithLocalStorage } from "@nudabagana/useful-hooks";

const STATE_KEY = "myStateKey";

const App: FC = () => {
  const [state, setState] = useStateWithLocalStorage<string>(
    STATE_KEY,
    "defaultValue"
  );

  return (
    <>
      My State: {state}
      <button onClick={() => setState("New State")}>Set new state</button>
    </>
  );
};
```

## useCountdown
Use this hook to get countdown in seconds. Pass number of seconds, it will count down to 0. You can reset it at any time.

Set initial value to 0, if you don't want to start it on load.

Usage:
```ts
import { useCountdown } from "@nudabagana/useful-hooks";

const COUNTDOWN_DURATION = 10;
const INITIAL_COUNTDOWN = 0;

const App: FC = () => {
  const [reset, secondsLeft] = useCountdown(
    COUNTDOWN_DURATION,
    INITIAL_COUNTDOWN
  );

  return (
    <>
      You have {secondsLeft}s left.
      <button onClick={() => reset()}>Reset</button>
    </>
  );
};
```

## useAuth
Use this hook to easily store, view and change your auth token in all of your webapp. This auth token is stored in localStorage, so it stays after page refresh.

Usage:

Wrap your page in AuthProvider.
```ts
import { AuthProvider } from "@nudabagana/useful-hooks";

const App: FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
```

Set your auth Token in any page.
```ts
import { useAuth } from "@nudabagana/useful-hooks";

const Loginpage: FC = () => {
  const [, setToken] = useAuth();

  return (
    <>
      <button onClick={() => setToken("SomeAuthToken")}>Login</button>
    </>
  );
};
```
Get your auth token in any page.
```ts
import { useAuth } from "@nudabagana/useful-hooks";

const SomePage: FC = () => {
  const [token] = useAuth();

  return <>user is {!!token ? "Authorized" : "Unauthorized"}</>;
};
```

## useCloseOnClick
Use this hook to handle dropdown/pop-up menus. "OnClick" function toggles "open" bool. Clicking anywhere on page sets "open" to false.

If you want to prevent "open" from changing state, call "e.preventDefault()" on click event.

Usage:
```ts
import { useCloseOnClick } from "@nudabagana/useful-hooks";

const App: FC = () => {
  const [menuOpen, onClick] = useCloseOnClick();

  return (
    <>
      <button onClick={onClick}>Toggle menu</button>
      {menuOpen && (
        <div>
          <button onClick={() => console.log("(closes menu)")}>Btn1</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("(manu stays open)");
            }}
          >
            Btn2
          </button>
        </div>
      )}
    </>
  );
};
```

## License
MIT
