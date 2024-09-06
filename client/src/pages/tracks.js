import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import TrackCard from '../containers/track-card';
import BoardGameCard from '../containers/board-game-card';
import { Layout, QueryResult } from '../components';
import './AddBoardGame.css'; // Import CSS file for styling
import './EditBoardGame.css'; // Import CSS file for styling

/** TRACKS gql query to retrieve all tracks */
const GAMES = gql`
  query GamesForHome {
    GamesForHome {
      id
      title
      description
      thumbnail
      author
      length
      numberOfPlayers
    }
  }
`;

const CREATE_BOARD_GAME = gql`
 mutation CreateBoardGame($input: GameInput!) {
    createBoardGame(input: $input) {
      id
      title
      description
      thumbnail
      author
      length
      numberOfPlayers
    }
  }
`;

const UPDATE_BOARD_GAME = gql`
  mutation UpdateBoardGame($id: ID!, $input: UpdateBoardGameInput!) {
    updateBoardGame(id: $id, input: $input) {
      id
      title
      description
      thumbnail
      author
      length
      numberOfPlayers
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(GAMES);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (game) => {
    console.log(game)
    setEditingGame(game);
    setShowForm(true); // Open form for editing
  };

  const handleCloseEdit = () => {
    setEditingGame(null);
    setShowForm(false); // Close form
  };

  return (
    <Layout grid>
      <div>
        <button onClick={handleToggleForm} className="toggle-form-button">
          {showForm ? 'Cancel' : 'Add New Board Game'}
        </button>
      </div>
      {showForm && <AddBoardGame />}
      {editingGame && <EditBoardGame game={editingGame} onClose={handleCloseEdit} />}
      <QueryResult error={error} loading={loading} data={data}>
        {data?.GamesForHome?.map((game, index) => (
          // <div key={game.id}>
          <>
            <BoardGameCard game={game} />
            <button onClick={() => handleEditClick(game)} className="edit-button">Edit</button>
          </>
          // </div>
        ))}
      </QueryResult>
    </Layout>
  );
};

const AddBoardGame = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('');
  const [length, setLength] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const [createBoardGame, { data, loading, error }] = useMutation(CREATE_BOARD_GAME, {
    refetchQueries: [{ query: GAMES }], // Refetch the games query
    onCompleted: (data) => {
      console.log('Board game created:', data.createBoardGame);
    },
    onError: (error) => {
      console.error('Error creating board game:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createBoardGame({
      variables: {
        input: {
          title,
          description,
          thumbnail,
          author,
          length: parseInt(length),
          numberOfPlayers: parseInt(numberOfPlayers),
        },
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Add a New Board Game</h2>
      <form onSubmit={handleSubmit} className="board-game-form">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="thumbnail">Thumbnail URL:</label>
        <input
          id="thumbnail"
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="length">Length (minutes):</label>
        <input
          id="length"
          type="number"
          placeholder="Length (minutes)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="numberOfPlayers">Number of Players:</label>
        <input
          id="numberOfPlayers"
          type="number"
          placeholder="Number of Players"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(e.target.value)}
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Adding...' : 'Add Board Game'}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
        {data && <p className="success-message">Board game added with ID: {data.createBoardGame.id}</p>}
      </form>
    </div>
  );
}

const EditBoardGame = ({ game, onClose }) => {
  console.log(game)
  const [title, setTitle] = useState(game?.title);
  const [description, setDescription] = useState(game?.description);
  const [thumbnail, setThumbnail] = useState(game?.thumbnail);
  const [author, setAuthor] = useState(game?.author);
  const [length, setLength] = useState(game?.length);
  const [numberOfPlayers, setNumberOfPlayers] = useState(game?.numberOfPlayers);

  const [updateBoardGame, { loading, error, data }] = useMutation(UPDATE_BOARD_GAME, {
    refetchQueries: [{ query: GAMES }], // Refetch the games query after updating
    onCompleted: () => {
      onClose(); // Close the form or handle success
    },
    onError: (error) => {
      console.error('Error updating board game:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBoardGame({
      variables: {
        id: game.id,
        input: {
          title,
          description,
          thumbnail,
          author,
          length: parseInt(length, 10),
          numberOfPlayers: parseInt(numberOfPlayers, 10),
        },
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Edit Board Game</h2>
      <form onSubmit={handleSubmit} className="board-game-form">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="thumbnail">Thumbnail URL:</label>
        <input
          id="thumbnail"
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="length">Length (minutes):</label>
        <input
          id="length"
          type="number"
          placeholder="Length (minutes)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="numberOfPlayers">Number of Players:</label>
        <input
          id="numberOfPlayers"
          type="number"
          placeholder="Number of Players"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Updating...' : 'Update Board Game'}
          </button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
        {error && <p className="error-message">Error: {error.message}</p>}
        {data && <p className="success-message">Board game updated with ID: {data.updateBoardGame.id}</p>}
      </form>
    </div>
  );
};

const x = {
  Tracks,
  AddBoardGame,
  EditBoardGame
}
export default x;
