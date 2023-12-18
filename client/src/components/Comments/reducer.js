const reducer = (state, action) => {
    switch (action?.type) {
        // Връща нов масив, съдържащ всички коментари, предоставени в action.payload. 
        case 'GET_ALL_COMMENTS':
            return [...action.payload];
            // Връща нов масив, като разпространява съществуващото състояние (...state) и добавя новия коментар от action.payload в края му.
        case 'ADD_COMMENT':
            return [...state, action.payload];
            // Проверява дали action.payload съдържа валиден _id на коментар. Ако не, записва грешка в конзолата и връща текущото състояние.
            // Ако присъства валиден _id, връща нов масив, където коментарът със съответния _id се обновява с новия текст, предоставен в action.payload.text.
        case 'EDIT_COMMENT':
            if (!action.payload._id) {
                console.error('Missing comment _id for editing.');
                return state;
            }
            return state.map(c => c._id === action.payload._id ? { ...c, text: action.payload.text } : c);
            // Връща нов масив, като филтрира коментара с _id, посочен в action.payload.
        case 'DELETE_COMMENT':
            return state.filter(c => c._id !== action.payload);
        default:
            return state;
    }
}

export default reducer;