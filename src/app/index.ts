import { SlotsPage } from '@/pages/slots/ui/slots-page';
import '@/app/styles.scss';

window.onload = () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        SlotsPage(appContainer);
    }
};
