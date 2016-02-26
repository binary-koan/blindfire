export default function executeActionPlans(game, actionLists) {
  const resolvedActions = [];

  function updatePlayer(player) {
    const action = actionLists[player.id].pop();

    if (!action || !game.isFreePosition(action.position)) return;

    if (!isValidMove(player, action.position)) {
      throw `Invalid move: ${JSON.stringify(action)} - are you hacking?`;
    }

    resolvedActions.push({
      type: "player", id: player.id,
      x: action.position.x, y: action.position.y,
      direction: action.direction
    });
  }

  function updatePlayers() {
    shuffle(game.players).forEach(updatePlayer);
  }

  times(5, updatePlayers);
}

  def update_player(player)
    player.shadow.stop_shadowing!
    move = player.shadow.shift_move

    return if move.nil?

    step_size = move[:type] == :shoot ? step_for_shoot : step_for_move
    plan = {
      frames_left: EXECUTION_TIME.to_i,
      step_size:   step_size,
      move:        move
    }

    player.set_non_render_position(move)

    if move[:type] == :shoot
      plan[:bullet] = {
        x: player.x,
        y: player.y,
        destination: PlayerShoot.new(player: player, game_state: game_state, direction: move[:direction]).call
      }
    end

    player.add_action(plan)
  end

  def step_for_move
    1.0/EXECUTION_TIME
  end

  def step_for_shoot
    20.0/EXECUTION_TIME
  end
end
