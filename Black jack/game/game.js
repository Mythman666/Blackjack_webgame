$(document).ready(function() {
    
    $('.button a').hide();
    
    $('#deal').click(function() {
    	$('li').remove();
    	$('.result p').remove();
    	$('.score h1').remove();
        $('.start a').hide();
        $('.button a').show();
        playGame();
    });


    $('#hit').click(function() {
		playerHand.hitMe("p");
		result = firstResultCheck();
		inputUserScore(result);
		if(isNumeric(result)){
			$('.button a').show();
            $('.start a').hide();
		} else {
			$('.button a').hide();
            $('.start a').show();
			return;
		}
    });


    $('#stand').click(function() {
    	while(dealerHand.score() < 17){
    		countingDealersCards = 0;
    		dealerHand.hitMe("b");
    	}
		result = finalResultCheck();
		$('.dealers_cards li').remove();
		revealDealerHand(dealerHand);
		inputUserScore(result);
		return;
    });
});

function cardFace(suit, figure){
	suits = {1: "C", 2: "D", 3: "H", 4: "S"};
	figures = {1: "A", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "J", 12: "Q", 13: "K"};
	var c = figures[figure] + suits[suit] + ".png";
	return c;
}

function deck(){
	this.create = function(){
  	var cardArray = [];
  	var i = 1;
  	var j = 1;
  		for(i = 1; i < 14; i++){
  			for(j = 1; j < 5; j++){
  				cardArray.push(new Card(j, i));
  			}
  		}
  	return shuffle(shuffle(cardArray));
  };
}

function deckChecker(){
	var array = new deck();
	var array = array.create();
	for(i = 0; i < 52; i++){
	  console.log(array[i].getNumber() +array[i].getSuit());
	}
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a;
}

function Card(suit, number){
	var CardSuit = suit;
	var CardNumber = number;
	this.getSuit = function(){
		return CardSuit;
	};
	this.getNumber = function(){
		return CardNumber;
	};
	this.getValue = function(){
    if( number === 1) {
        return 11;
    } else if( number > 9) {
        return 10;
    } else {
    return number;
    }
	};
}

function revealDealerHand(hand){
	var hand = hand.getHand();
	for(i=0;i<hand.length;i++){
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="../cards/' + cardFace(hand[i].getSuit(), hand[i].getNumber()) + '" /></a></li>');
	}
}

var deal = function(whos){
	var newCard = gameDeck.pop();
	if(whos == "b"){
		countingDealersCards+= 1;
	}
	if(whos == "p"){
		$('.players_cards ul').prepend('<li><a href="#"><img src="../cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" /></a></li>');
	} else if(whos == "b" && countingDealersCards < 2) {
		$('.dealers_cards').css("height", "");
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="../cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" /></a></li>');
	} else if(whos == "b" && countingDealersCards == 2){
		$('.dealers_cards ul').prepend('<li><a href="#"><img src="../cards/blue_back.png" /></a></li>');
	}
	return newCard;
};

function Hand(whos, howManyCards){
	var who = whos;
	var cardArray = [];
		for(i = 0; i < howManyCards; i++) {
    cardArray[i] = deal(who);
	}
	this.getHand = function() {
    return cardArray;
	};

	this.score = function(){
		var handSum = 0;
		var numofaces = 0;
		for(i=0;i<cardArray.length;i++){
			handSum += cardArray[i].getValue();
			if(cardArray[i].getNumber() === 1){
        		numofaces+=1;
        	}
        }
    	if(handSum > 21 && numofaces!=0){
    		for(i=0;i<numofaces;i++){
    			if(handSum > 21){
    				handSum-=10;
    			}
    		}
    	}
        return handSum;
	};
	this.printHand = function(){
		var string = "";
		for(i=0;i<cardArray.length;i++){
			string = string + cardArray[i].getNumber() + cardArray[i].getSuit()+", ";
		}
		return string;
	};
	this.hitMe = function(whos){
    cardArray.push(deal(whos));
	this.getHand();
	};
}

var finalResultCheck = function(){
	var pS = playerHand.score();
	var dS = dealerHand.score();
    $('.button a').hide();
    $('.start a').show();
	if(pS > 21){
      	if( dS >21){
          	return "Tide";
      	}
      	else{
      	return "YOU LOSE";
            $('.button a').hide();
            $('.start a').show();
      	}
  	}
  	else if(dS>21){
    	return "YOU WIN";
 	}
  	else if(pS>dS){
      	return "YOU WIN";
  	}
  	else if(pS===dS){
      	return "Tide";
  	}
  	else{
      	return "YOU LOSE";
        $('.button a').hide();
        $('.start a').show();
  	}
 };

 var inputUserScore = function(input){
 	$('.result p').remove();
	$('.result').prepend("<p>" + input + "</p>");
 }

 var firstResultCheck = function(){
	pS = playerHand.score();
	dS = dealerHand.score();
	if(pS > 21){
      	if( dS >21){
          	return "TideOver";
      	}
      	else{
      	return "YOU LOSE";
            $('.button a').hide();
            $('.start a').show();
      	}
  	}
  	else if(dS>21){
    	return " YOU WIN";
        $('.button a').hide();
        $('.start a').show();
 	}
 	else if(pS===21){
 		return "BJ!";
        $('.button a').hide();
        $('.start a').show();
 	}
  	else{
      	return pS;
  	}
     
 };

var phaseOne = function(){
	dealerHand = new Hand("b", 2);
	playerHand = new Hand("p", 2);
	result = firstResultCheck();

	inputUserScore(result);
	if(isNumeric(result)){
        $('.button a').show();
            $('.start a').hide();
		} else {
			$('.button a').hide();
            $('.start a').show();
			return;
		}
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var playGame = function(){
	var gdeck = new deck();
	countingDealersCards = 0;
	gameDeck = gdeck.create();
	phaseOne();
};