import { useEffect, useRef } from "react";
import { useTodoContext } from "../../contexts/TodoContext";
import styles from "./ProfileSelect.module.scss";

export const ProfileSelector = () => {
  const { profiles, selectedProfile, selectProfile } = useTodoContext();
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (profiles.length > 0 && !selectedProfile) {
      selectProfile(profiles[0].id);
    }
  }, [profiles, selectedProfile, selectProfile]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfileId = e.target.value;
    selectProfile(selectedProfileId);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  return (
    <div className={styles.selector}>
      <label className={styles.title} htmlFor="profile-selector">
        Выбрать пользователя:
      </label>
      <select
        id="profile-selector"
        ref={selectRef}
        value={selectedProfile?.id || ""}
        onChange={handleProfileChange}
      >
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
    </div>
  );
};
