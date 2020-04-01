var Purity = {
    container: new UI.Container(),
    purity: 100,
	isMin: false,
    isShow: false,
    
    showWindow: function () {
        
            UI.getContext().runOnUiThread(new java.lang.Runnable({
                run: function () {
                    Purity.container.openAs(Purity.popupWindow);
                }
            }));
    },
    
    init: function () {
        
    this.popupWindow = new UI.Window({
    location: {
        x: 60,
        y: 28,
        width: 50,
        height: 50
    },

    drawing: [
        {type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)}
    ],

    elements: {
        "icon": {type: "image", x: 0, y: 0, width: 400, height: 400, bitmap: "purity_icon", scale: 1},
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
	  if (!Purity.isShow){
        Purity.init();
        Purity.isShow = true;
      }
                if (Purity.purity >= 0.005) {
				    let color;
					if (Purity.isMin){
						color = android.graphics.Color.RED;
					} else {
						color = android.graphics.Color.WHITE;
					}
                    Purity.purity-=0.005;
                    Purity.update(Purity.purity, color);
                }
	if (Purity.purity <= 15) {
		Purity.isMin = true;
	}
	if (Purity.purity < 0.005){
        Entity.addEffect(player, 19, 1, 300, true, true);
	}
  }
});

Callback.addCallback("ItemUse", function (coords, item, block) {
    if (item.id == 325){
		if (item.count <= 1){
			if (Purity.purity < 99.5){
                Purity.purity = 100;
		        Purity.isMin = false;
				Player.setCarriedItem(ItemID.peebucket, 1, 0);
			}
		}
	}
	if (item.id == ItemID.peebucket){
		Player.setCarriedItem(325, 1, 0);
	}
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
	let mode = Game.getGameMode();
    if((screenName == "in_game_play_screen") && ((mode == 0) || (mode == 2))) {
           Purity.init();
    } else {
           Purity.container.close();
    }
});