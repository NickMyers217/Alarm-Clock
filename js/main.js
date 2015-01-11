var Clock = function() {
	this.time = this.getCurrentTime();		
	this.set = false;
	this.setHours = 0;
	this.setMins = 0;
	this.setSecs = 0;
	this.audioPath = "/home/ogremagi/Music/";
	this.song = "None";
	this.playing = false;
};

Clock.prototype.startClock = function() {
	var clock = this;
	setInterval(function() {
		if(clock.set) {
			if(clock.compareTime() && !this.playing) {
				this.playing = true;
				clock.soundAlarm();
			}
		}

		clock.time = clock.getCurrentTime();
		clock.renderTime(clock.time);
	}, 1000);
};

Clock.prototype.getCurrentTime = function() {
	var now = new Date();
	return now;
};

Clock.prototype.parseSetTime = function(hours, mins, secs) {
	if(hours.toString().length == 1) hours = "0" + hours;
	if(mins.toString().length == 1) mins = "0" + mins;
	if(secs.toString().length == 1) secs = "0" + secs;

	return hours + ":" + mins + ":" + secs;
};

Clock.prototype.parseTime = function(time) {
	var hours = time.getHours();
	var mins = time.getMinutes();
	var secs = time.getSeconds();

	if(hours.toString().length == 1) hours = "0" + hours;
	if(mins.toString().length == 1) mins = "0" + mins;
	if(secs.toString().length == 1) secs = "0" + secs;

	return hours + ":" + mins + ":" + secs;
};

Clock.prototype.renderTime = function(time) {
	//This code will be reworked once I implement a real renderer
	$("#renderer").html(this.parseTime(time));
};

Clock.prototype.compareTime = function() {
	var time = this.parseTime(this.time);
	var setTime = this.parseSetTime(this.setHours, this.setMins, this.setSecs);
	if(time == setTime) return true;
	else return false;
};

Clock.prototype.updateSong = function() {
	var songFiles = $("#song").prop("files");
	if(songFiles.length > 0)
		this.song = songFiles[0].name;
};

Clock.prototype.chooseSong = function() {
	$("#song").click();
};

Clock.prototype.loadSong = function() {
	var song = new Audio(this.audioPath + this.song);
	return song;
};

Clock.prototype.soundAlarm = function() {
	this.loadSong().play();
};

window.onload = function() {
	/*
	 *TODO: 
	 * -add a real renderer
	 * -detect when to set playing back to false
	 */

	var clock = new Clock();
	clock.startClock();
	$("#song").on("change", function() {
		clock.updateSong();
	});
	var gui = new dat.GUI({ width: 700 });
	var f1 = gui.addFolder("Set Time");
	f1.add(clock, "setHours", 0, 23).step(1);
	f1.add(clock, "setMins", 0, 59).step(1);
	f1.add(clock, "setSecs", 0, 59).step(1);
	f1.open();
	var f2 = gui.addFolder("Song");
	f2.add(clock, "audioPath");
	f2.add(clock, "song").listen();
	f2.add(clock, "chooseSong").name("Choose song");
	f2.open();
	gui.add(clock, "set");
};

