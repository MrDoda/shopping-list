import { appStore } from "../store/appStore.js";

interface Params {
  key: string;
  message: string;
}

export const addAlert = ({ key, message }: Params) => {
  appStore.setState({
    alerts: { ...appStore.getState().alerts, [key]: message },
  });
};
