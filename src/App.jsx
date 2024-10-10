/** @format */
import Map from './map';

function App() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh', // Full viewport height
				width: '98vw', // Full viewport width
				backgroundColor: '#f0f4f8', // Light background for better contrast
			}}
		>
			<h1
				style={{
					fontFamily: 'Arial, sans-serif',
					fontSize: '2.5rem',
					color: '#333',
					marginBottom: '20px', // Space below heading
					textShadow: '1px 1px 2px rgba(0,0,0,0.2)', // Adds subtle shadow for depth
				}}
			>
				ZigZag Tracker
			</h1>
			<div
				style={{
					height: '80vh', // 80% of the viewport height for the map
					width: '80vw', // 80% of the viewport width for the map
					borderRadius: '12px', // Rounded corners
					overflow: 'hidden', // Hide overflow for rounded corners
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
					border: '1px solid #ddd', // Light border
				}}
			>
				<Map />
			</div>
		</div>
	);
}

export default App;
