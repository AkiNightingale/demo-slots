export const SpinButton = (onClick: () => void): HTMLButtonElement => {
    const button = document.createElement('button');
    button.innerText = 'Spin';
    button.style.padding = '10px 20px';
    button.style.fontSize = '18px';
    button.style.cursor = 'pointer';
    button.style.marginTop = '20px';

    button.addEventListener('click', () => {
        onClick();
    });

    return button;
};
