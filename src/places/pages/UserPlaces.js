import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useHttpClient from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const userId = useParams().userId;

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responceData = await sendRequest(
					`http://localhost:5000/api/places/users/${userId}`
				);
				setLoadedPlaces(responceData.places);
			} catch (error) {}
		};
		fetchPlaces();
	}, [sendRequest, userId]);

	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces((prevPlaces) =>
			prevPlaces.filter((place) => place.id !== deletedPlaceId)
		);
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && loadedPlaces && (
				<PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
			)}
		</>
	);
};

export default UserPlaces;
