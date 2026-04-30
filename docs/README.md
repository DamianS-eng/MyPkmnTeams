# How are the teams imported?

All the team members are inside the file [pkmnteams.json](pkmnteams.json).

The `.json` is one big Javascript object arranged in this hierarchy:

- Generation:
  - List of members
    - Each member has:
      - species name
      - national pokedex number
      - nickname
      - nature
      - list of moves
     
> Spin-offs like Colosseum, XD and Legends are a separate generation.
