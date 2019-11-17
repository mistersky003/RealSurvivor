var Energy = {
    container: new UI.Container(),
    energy: 100,
	isMin: false,
    isShow: false,
    
    showWindow: function () {
        
            UI.getContext().runOnUiThread(new java.lang.Runnable({
                run: function () {
                    Energy.container.openAs(Energy.popupWindow);
                }
            }));
    },
    
    init: function () {
        
    this.popupWindow = new UI.Window({
    location: {
        x: 5,
        y: 28,
        width: 50,
        height: 50
    },

    drawing: [
        {type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)}
    ],

    elements: {
        "icon": {type: "image", x: 0, y: 0, width: 400, height: 400, bitmap: "energy_icon", scale: 1},
        "info": {type: "text", x: 450, y: 80, text: Math.round(Energy.energy).toString() + "%", font: {color: android.graphics.Color.WHITE, size: 200}}
    }
    });

       this.popupWindow.setAsGameOverlay(true);
       this.showWindow();
       
    },
    
    update: function (val, col) {
  
    let elements = this.popupWindow.getContent().elements;
    
        elements["info"] = {
            type: "text",
            x: 450,
            y: 80,
            text: Math.round(val).toString() + "%",
            font: {
                color: col, size: 200
            }
        }
    },
    
    sleep: function () {
        if (Energy.energy < 100){
            Energy.energy = 100;
			Energy.isMin = false;
        }
    }
    
};

Callback.addCallback("tick", function () { 
  let MobEffect = Native.PotionEffect;
  let player = Player.get();
  if (!Player.getFlyingEnabled()){
	if (!Energy.isShow){
        Energy.init();
        Energy.isShow = true;
    } 
    let cor1 = Player.getVelocity();
    if ((cor1.x > 0) || (cor1.x < 0)){
        if ((cor1.y > 0) || (cor1.y < 0)){
            if ((cor1.z > 0) || (cor1.z < 0)){
                if (Energy.energy >= 0.002) {
				    let color;
					if (Energy.isMin){
						color = android.graphics.Color.RED;
					} else {
						color = android.graphics.Color.WHITE;
					}
                    Energy.energy-=0.002;
                    Energy.update(Energy.energy, color);
                }
            }
        }
    }
	if(Energy.energy <= 15) {
		    Energy.isMin = true;
            Entity.addEffect(player, 2, 1, 100, true, true);
    } 
	if (Energy.energy < 0.5){
            Entity.addEffect(player, 15, 2, 100, true, true);
	}
  }
});

Callback.addCallback("ItemUse", function (coords, item, block) {
    if (block.id == 26){
        Energy.sleep();
    }
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if((screenName == "hud_screen") || (screenName == "in_game_play_screen")) {
       if (!Player.getFlyingEnabled()){
           Energy.init();
       }
    } else {
        Energy.container.close();
    }
});