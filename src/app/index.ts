import { SlotsPageView } from '@/pages/slots/ui/slots-page-view';
import '@/app/styles.scss';

window.onload = () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        SlotsPageView(appContainer);
    }
};
