import Swal, { SweetAlertOptions, SweetAlertResult, SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type FireFunction = {
  <T = any>(options: SweetAlertOptions): Promise<SweetAlertResult<Awaited<T>>>;
  <T = any>(title?: string, html?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult<Awaited<T>>>;
};

(MySwal as any).fire = (async (...args: any[]) => {
  if (args.length === 1 && typeof args[0] === 'object') {
    const options: SweetAlertOptions = args[0];
    const defaultOptions: SweetAlertOptions = {
      ...options,
      customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-confirm-button',
        denyButton: 'custom-deny-button',
        footer: 'custom-footer',
      },
    };

    return Swal.fire(defaultOptions);
  } else {
    const [title, html, icon] = args;
    return Swal.fire(title, html, icon);
  }
}) as FireFunction;

export default MySwal;
