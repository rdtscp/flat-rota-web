This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) using [TypeScript](https://github.com/Microsoft/TypeScript), [Redux](https://github.com/reduxjs/redux), and [Material UI](https://github.com/mui-org/material-ui).

Project Source Directory is as such:
```
src
├── App
│   ├── App.tsx
│   ├── Styles.ts
│   ├── Theme.ts
│   ├── Types.ts
│   └── index.ts
├── Components
│   ├── AppNavigator
│   │   ├── AppNavigator.tsx
│   │   ├── Styles.ts
│   │   ├── Types.ts
│   │   └── index.ts
│   ├── LoginForm
│   │   ├── LoginForm.tsx
│   │   ├── Styles.ts
│   │   ├── Types.ts
│   │   └── index.ts
│   ├── NavigatorPanes
│   │   ├── AppInstructions
│   │   │   ├── DrawerElement.tsx
│   │   │   ├── PaneElement.tsx
│   │   │   └── index.ts
│   │   ├── ExamplePane
│   │   │   ├── DrawerElement.tsx
│   │   │   ├── PaneElement.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── SettingsMenu
│       ├── ConfirmDelete
│       │   ├── ConfirmDelete.tsx
│       │   ├── Styles.ts
│       │   ├── Types.ts
│       │   └── index.ts
│       ├── Device
│       │   ├── Device.tsx
│       │   ├── Styles.ts
│       │   ├── Types.ts
│       │   └── index.ts
│       ├── DeviceList
│       │   ├── DeviceList.tsx
│       │   ├── Styles.ts
│       │   ├── Types.ts
│       │   └── index.ts
│       ├── SettingsMenu.tsx
│       ├── Styles.ts
│       ├── Types.ts
│       └── index.ts
├── Models
│   ├── Device.ts
│   ├── NavigatorPane.ts
│   ├── State.ts
│   ├── User.ts
│   └── index.ts
├── Resources
│   ├── Generics.ts
│   ├── networkHelper.ts
│   └── utilitiesHelper.ts
├── State
│   ├── Actions
│   │   ├── actionTypes.ts
│   │   ├── authActions.ts
│   │   └── userActions.ts
│   ├── Reducers
│   │   ├── authReducer.ts
│   │   ├── index.ts
│   │   └── userReducer.ts
│   └── Store.ts
├── index.tsx
├── registerServiceWorker.ts
└── styles.css
```
The application title can be set within src/index.tsx, and the favicon within the public folder as per usual.
