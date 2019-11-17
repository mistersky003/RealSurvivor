var Thirst = {
    container: new UI.Container(),
    thirst: 100,
	isMin: false,
    isShow: false,
    
    showWindow: function () {
        
            UI.getContext().runOnUiThread(new java.lang.Runnable({
                run: function () {
                    Thirst.container.openAs(Thirst.popupWindow);
                }
            }));
    },
    
    init: function () {
        
    this.popupWindow = new UI.Window({
    location: {
        x: 120,
        y: 28,
        width: 50,
        height: 50
    },

    drawing: [
        {type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)}
    ],

    elements: {
        "icon": {type: "image", x: 0, y: 0, width: 400, height: 400, bitmap: "thirst_icon", scale: 1},
        "info": {type: "text", x: 450, y: 80, text: Math.round(Purity.purity).toString() + "%", font: {color: android.graphics.Color.WHITE, size: 200}}
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
    }
    
};

Callback.addCallback("tick", function () { 
  let MobEffect = Native.PotionEffect;
  let player = Player.get();
  if (!Player.getFlyingEnabled()){
	  if (!Thirst.isShow){
        Thirst.init();
        Thirst.isShow = true;
      }
                if (Thirst.thirst >= 0.002) {
				    let color;
					if (Thirst.isMin){
						color = android.graphics.Color.RED;
					} else {
						color = android.graphics.Color.WHITE;
					}
                    Thirst.thirst-=0.002;
                    Thirst.update(Thirst.thirst, color);
                }
	if (Thirst.thirst <= 15) {
		Thirst.isMin = true;
	}
	if (Thirst.thirst < 0.002){
        Thirst.addEffect(player, 19, 1, 300, true, true);
	}
  }
});

Callback.addCallback("ItemUse", function (coords, item, block) {
    if (item.id == 373 && item.data == 0){
        if (Thirst.thirst < 99.5) {
		    Thirst.thirst = 100;
			Player.setCarriedItem(374, 1, 0);
		}
	}
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if((screenName == "hud_screen") || (screenName == "in_game_play_screen")) {
       if (!Player.getFlyingEnabled()){
           Thirst.init();
       }
    } else {
        Thirst.container.close();
    }
});