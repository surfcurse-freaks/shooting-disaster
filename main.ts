// Destroy enemy on projectile hit
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    enemy.destroy(effects.fire, 100)
    projectile.destroy()
    info.changeScoreBy(1)
})
// Fire projectile on button press
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . 1 . . 
        . 1 1 1 . 
        1 1 1 1 1 
        . 1 1 1 . 
        . . 1 . . 
        `, player2, 0, -100)
    projectile.setKind(SpriteKind.Projectile)
})
// End game if enemy hits the player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player3, enemy) {
    game.over(false, effects.dissolve)
})
let enemy: Sprite = null
let score = 0
let projectile: Sprite = null
let player2: Sprite = null
// Create player sprite
player2 = sprites.create(img`
    . . . 5 5 5 . . . 
    . . 5 4 5 4 5 . . 
    . 5 5 4 4 4 5 5 . 
    5 4 4 4 5 4 4 4 5 
    5 5 5 4 5 4 5 5 5 
    . . . 4 4 4 . . . 
    . . 5 5 . 5 5 . . 
    `, SpriteKind.Player)
controller.moveSprite(player2)
player2.setStayInScreen(true)
// Set background and variables
scene.setBackgroundColor(15)
let enemySpeed = 50
let enemySize = 1
// Create score tracker
info.setScore(0)
// Increase enemy size and speed at score milestones
game.onUpdate(function () {
    score = info.score()
    if (score % 25 == 0 && score > 0) {
        enemySpeed += 10
        enemySize += 0.2
        // Prevents constant triggering at milestones
        info.setScore(score + 1)
    }
})
// Spawn enemies
game.onUpdateInterval(1000, function () {
    enemy = sprites.create(img`
        . . 8 8 8 . . 
        . 8 6 6 6 8 . 
        8 6 7 7 7 6 8 
        8 6 7 7 7 6 8 
        . 8 6 6 6 8 . 
        . . 8 8 8 . . 
        `, SpriteKind.Enemy)
    enemy.setVelocity(0, enemySpeed)
    enemy.setPosition(randint(10, 150), 0)
    enemy.setFlag(SpriteFlag.AutoDestroy, true)
    enemy.setScale(enemySize, ScaleAnchor.Middle)
})
