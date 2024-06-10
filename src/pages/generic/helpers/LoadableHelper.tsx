import { Loadable } from 'recoil';

export const getLoadableStateAndContents = (loadable: Loadable<any>) => {
  switch (loadable.state) {
    case 'loading':
      return { loading: true, data: null };
    case 'hasValue':
      return { loading: false, data: loadable.contents };
    case 'hasError':
      return { loading: false, error: loadable.contents, data: null };
    default:
      return { loading: false, error: null, data: null };
  }
};