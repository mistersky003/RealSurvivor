Saver.addSavesScope("SaveValues",
    function read(scope) {
        Energy.energy = scope.energy || 100;
        Purity.purity = scope.purity || 100;
        Thirst.thirst = scope.thirst || 100;
    },

    function save() {
        return {
            energy: Energy.energy,
            purity: Purity.purity,
            thirst: Thirst.thirst
        };
    }
);